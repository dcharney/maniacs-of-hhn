const db = require('./connection');
const { Category, Attraction, Year, Park } = require('../models');

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
            },
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel. Magna fermentum iaculis eu non. Aliquet sagittis id consectetur purus ut. Nisi est sit amet facilisis magna etiam tempor. Id volutpat lacus laoreet non curabitur gravida. Fermentum leo vel orci porta non. Eget felis eget nunc lobortis mattis. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sed velit dignissim sodales ut eu. Ut ornare lectus sit amet est placerat in egestas.

            Risus commodo viverra maecenas accumsan lacus. Pharetra magna ac placerat vestibulum. Sed vulputate mi sit amet. Interdum velit laoreet id donec ultrices tincidunt arcu. Facilisis magna etiam tempor orci eu. Eu nisl nunc mi ipsum faucibus vitae aliquet. Integer quis auctor elit sed vulputate mi sit. Sem integer vitae justo eget magna fermentum iaculis. Imperdiet proin fermentum leo vel orci porta non pulvinar. Posuere sollicitudin aliquam ultrices sagittis orci. Interdum velit euismod in pellentesque massa placerat duis ultricies. Augue interdum velit euismod in pellentesque massa placerat. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.
            
            Faucibus vitae aliquet nec ullamcorper sit amet risus. Tortor pretium viverra suspendisse potenti. Pulvinar etiam non quam lacus suspendisse faucibus. Urna et pharetra pharetra massa massa. Elementum integer enim neque volutpat ac. Nunc scelerisque viverra mauris in aliquam sem. Porttitor eget dolor morbi non arcu risus. Donec massa sapien faucibus et. Id cursus metus aliquam eleifend mi. Nulla pellentesque dignissim enim sit amet venenatis.`
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

    process.exit();
});