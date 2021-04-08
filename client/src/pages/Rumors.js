import React from 'react';
import { Timeline } from 'react-twitter-widgets'


const Rumors = () => {
    return (
        <main className="rumors">
            <h1>Updates, news and social via Twitter</h1>
            <Timeline
              dataSource={{
                sourceType: 'list',
                id: '1379864812646244352'
              }}
              options={{
                width: '750',
                theme: "dark",
                chrome: "noheader, nofooter, transparent",
              }}
              renderError={(_err) => <p>Could not load timeline</p>}
            />
        </main>
    );
};

export default Rumors;