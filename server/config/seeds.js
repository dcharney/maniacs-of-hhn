const db = require('./connection');
const { Category, Attraction, Year, Park, Post } = require('../models');
const faker = require('faker');

db.once('open', async () => {
    await Category.deleteMany();
    const categories = await Category.insertMany([
        { name: 'Haunted Houses' },
        { name: 'Scare Zones' },
        { name: 'Attractions' },
        { name: 'Live Entertainment' },
        { name: 'Merchandise and Dining' }
    ]);
    console.log('categories seeded');

    await Year.deleteMany();
    const years = await Year.insertMany([
        { year: '2018' },
        { year: '2019' },
        { year: '2020' }
    ]);
    console.log('categories seeded');

    await Park.deleteMany();
    const parks = await Park.insertMany([
        { park: 'Florida' },
        { park: 'Hollywood' },
        { park: 'Japan' },
        { park: 'Singapore' }
    ]);
    console.log('categories seeded');

    await Attraction.deleteMany();
    const attractions = await Attraction.insertMany([
        {
            name: 'House of 1000 Corpses',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 500
            }
        },
        {
            name: 'Killer Klowns from Outer Space',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 800,
                left: 500
            }
            
        },
        {
            name: 'Depths of Fear',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 800
            }
            
        },
        {
            name: 'Stranger Things',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 1000
            }
            
        },
        {
            name: 'Ghostbusters',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 1000,
                left: 500
            }
            
        },
        {
            name: 'Yeti: Terror of the Yukon',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 200,
                left: 500
            }
            
        },
        {
            name: 'Graveyard Games',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 100
            }
            
        },
        {
            name: 'Nightingales: Blood Pit',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 700,
                left: 700
            }
            
        },
        {
            name: 'Universal Monsters',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 900,
                left: 360
            }
            
        },
        {
            name: 'Us',
            park: parks[0]._id,
            year: years[1]._id,
            category: categories[0]._id,
            imap: {
                top: 200,
                left: 100
            }
            
        }
    ])
    console.log('attractions seeded');

    let posts = [];
    for (let i=0; i<20; i++){
        let comments = [];
        for(let x=0; x<Math.floor(Math.random() * 5); x++){
            let comment = {
                username: faker.internet.userName,
                commentBody: faker.lorem.sentence,
                createdAt: faker.date.recent
            }
            comments.push(comment);
        }

        let post = {
            category: categories[Math.floor(Math.random() * categories.length)],
            image: faker.image.image,
            title: faker.lorem.word,
            content: faker.lorem.paragraph,
            comment: comments,
            createdAt: faker.date.past
        }
        posts.push(post);
    }

    await Post.deleteMany();
    Post.insertMany(posts);
    console.log('posts seeded');

    process.exit();
});