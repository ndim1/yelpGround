const mongoose = require('mongoose');
const cities = require('./cities')
const { descriptors, locators } = require('./base') 
const Product = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpGround');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpGround');
    console.log("database conected");
}
const sample = array => array[Math.floor(Math.random() * array.length)]
const seed = async () => {
    await Product.deleteMany({});
    for (let i = 0; i < 18; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const map = new Product({
            author: '61531777c016c263216c8813', 
            location: `${cities[random].city}`,
            title: `${sample(descriptors)} ${sample(locators)}`,
         
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel libero reprehenderit repudiandae, sit, cum consequatur vitae nisi, repellendus cumque dignissimos aperiam iusto veniam officia quo illo inventore eveniet in tempora.',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude,
                ]
            },
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/yelpground/image/upload/v1632830032/yelpground/lpuo7hxdddnsbrfq7de6.jpg',
                    filename: 'yelpground/lpuo7hxdddnsbrfq7de6',
                },
                {
                    url: 'https://res.cloudinary.com/yelpground/image/upload/v1632830033/yelpground/prjbiokkubnrcj82tyhe.jpg',
                    filename: 'yelpground/prjbiokkubnrcj82tyhe',
                }
            ]
        })
        await map.save();
    }
}
seed().then(() => {
    mongoose.connection.close(); 
});