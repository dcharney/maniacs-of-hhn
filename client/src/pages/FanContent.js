import React from 'react';
//  import FanContent from '../components/FanContent';
import CreateNewPost from '../components/CreateNewPost';
import DisplayAllPost from '../components/DisplayAllPost';
import ModifyPost from '../components/ModifyPost';
import Post from '../components/Post';



const Fan = () => {
    return (
        <main>
            <CreateNewPost />
            <DisplayAllPost />
            <ModifyPost />
            <Post />

          
        </main>
    );
};

export default Fan;