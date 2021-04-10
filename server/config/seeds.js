const db = require('./connection');
const { Category, Attraction } = require('../models');

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

    await Attraction.deleteMany();

    const attractions = await Attraction.insertMany([
        {
            name: 'House of 1000 Corpses',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 500
            }
        },
        {
            name: 'Killer Klowns from Outer Space',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 800,
                left: 500
            }
            
        },
        {
            name: 'Depths of Fear',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 800
            }
            
        },
        {
            name: 'Stranger Things',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 1000
            }
            
        },
        {
            name: 'Ghostbusters',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 1000,
                left: 500
            }
            
        },
        {
            name: 'Yeti: Terror of the Yukon',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 200,
                left: 500
            }
            
        },
        {
            name: 'Graveyard Games',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 500,
                left: 100
            }
            
        },
        {
            name: 'Nightingales: Blood Pit',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 700,
                left: 700
            }
            
        },
        {
            name: 'Universal Monsters',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 900,
                left: 360
            }
            
        },
        {
            name: 'Us',
            location: 'Orlando',
            year: '2019',
            category: categories[0]._id,
            imap: {
                top: 200,
                left: 100
            }
            
        }
    ])

    console.log('attractions seeded');

    process.exit();
});