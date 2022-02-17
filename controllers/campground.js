const Product = require('../models/campground');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_Token;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

const { cloudinary } = require('../cloudinary/index')



module.exports.show = async (req, res) => {
    const product = await Product.find({});
    res.render('campground/show', { product });
}
module.exports.viewNew = (req, res) => {
    res.render('campground/new')
}
module.exports.makeNew = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({ 
        query: req.body.product.location,
        limit: 1
    }).send()
   
    const product = new Product(req.body.product);
    product.geometry = geoData.body.features[0].geometry
    product.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    product.author = req.user._id;
    await product.save();
    console.log(product)
    req.flash('succses', 'We make new campground very succsesful')
    res.redirect(`/campground/${product._id}`);
}
module.exports.showAlone = async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    console.log(product)
    
    //}
    if (!product) {
        req.flash('error', 'We not have a this id');
        return res.redirect('/campground')
    }
    res.render('campground/alone', { product })
}
module.exports.showEdit = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        req.flash('error', 'We not have a this id');
        return res.redirect('/campground')
    }
    res.render('campground/edit', { product })
}
module.exports.edit = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.body)
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    product.images.push(...imgs);
    await product.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await product.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('succses', 'Congrats you edit a campground')
    res.redirect(`/campground/${product._id}`)
}
module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)
    req.flash('succses', 'You deleted a campground')
    res.redirect(`/campground`)

}