import React from 'react';
import './styles.css';

const logo = require('./images/hhnlogo.png').default;
const updates = require('./images/updates.png').default;

const Info = () => {

    return (
        <div className="container">
        <div className="d-flex justify-content-center">
            <a className="hhn30" href="/"><img className="logo" src={logo} alt="logo..." /></a>
        </div>
        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget nisl metus. Aliquam semper ligula ligula, nec laoreet erat tempor at. Vestibulum sagittis est nec ullamcorper dignissim. Nulla libero purus, bibendum a tincidunt id, egestas eu ipsum. Cras aliquet vel nulla ac pellentesque. Sed ultrices vel purus eu cursus. Donec dictum ultrices magna vitae efficitur. Cras placerat mattis facilisis.
Quisque hendrerit ipsum sit amet risus feugiat, vitae pharetra sapien pulvinar. Suspendisse in elit ullamcorper, sollicitudin dui et, rhoncus tortor. Quisque imperdiet fringilla ante, in ullamcorper mi molestie vel. Sed placerat turpis nec nisi ornare, ac iaculis ante rutrum. Praesent aliquet lorem in nulla sollicitudin blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc posuere libero in ante hendrerit mattis. Praesent fermentum ipsum nec viverra fermentum. Ut sit amet hendrerit diam. Praesent nec massa augue. Proin in maximus neque. Nam non sem at ipsum molestie iaculis. Nunc ex ex, posuere sed velit sit amet, consectetur rutrum ex. Pellentesque vitae dapibus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus et sem erat.
Duis porta justo in tristique faucibus. Pellentesque semper bibendum odio sit amet egestas. Cras sit amet hendrerit magna. In id tincidunt mauris, nec pharetra diam. Suspendisse potenti. Mauris sit amet ipsum vel nisi elementum malesuada eu non ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce vulputate magna a lacus efficitur pharetra. Vestibulum sed justo felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam faucibus accumsan arcu, id porta nunc tempor eu.
Nullam eu pretium purus. Sed pharetra, tortor eu dictum volutpat, eros velit placerat nunc, ut tristique arcu mauris vel orci. Vivamus tempor venenatis ex, eget ultricies lorem. Praesent consectetur porttitor nisi, ac vulputate ipsum rhoncus eu. Phasellus posuere dolor odio, sit amet sodales sapien gravida condimentum. Donec maximus, enim nec euismod elementum, lectus dolor volutpat arcu, ut sollicitudin purus eros vitae mi. Nunc ac sem aliquam, elementum diam vel, blandit nulla. Nam tellus justo, suscipit in porta et, viverra et lorem. Integer eget ante eu magna ullamcorper convallis.
Aliquam eget lectus nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec aliquet justo. Aliquam placerat, mi at ornare efficitur, mauris felis pulvinar dui, a efficitur leo velit hendrerit tortor. Ut euismod est ut tellus laoreet ornare. Donec eget magna vel mauris commodo tincidunt ut vitae elit. Phasellus mattis commodo euismod. Integer id ipsum lacus. In a ornare enim, at malesuada nibh. Quisque semper ligula libero, eget condimentum massa pharetra sit amet. Quisque sodales leo eget facilisis commodo. Quisque finibus nibh lacus, sit amet pellentesque mi rutrum ac. Pellentesque eget ligula et diam imperdiet egestas placerat eu enim. Aenean ac ultrices quam. Donec porttitor, orci sed convallis mollis, quam arcu consectetur risus, eget fringilla nisl odio facilisis lectus.</a>
        </div>
    )
}

export default Info;