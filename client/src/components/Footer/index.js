import React from 'react';
import './style.css';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
  TumblrShareButton,
  TumblrIcon
} from "react-share";

const Footer = () => {
  return (
    <footer id="footer" className="sticky-btm">
      <div>
        Share our website on social media! 👻<br />
        <FacebookShareButton
          url={"#"}
          quote={"Join the Maniacs of Horror Nights"}
          hashtag="#maniacsofhhn"
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>

        <TwitterShareButton
          url={"#"}
          quote={"Join the Maniacs of Horror Nights"}
          hashtag="#maniacsofhhn"
        >
          <TwitterIcon size={36} />
        </TwitterShareButton>

        <EmailShareButton
          url={"#"}
        >
          <EmailIcon size={36} />
        </EmailShareButton>

        <RedditShareButton
          url={"#"}
          quote={"Join the Maniacs of Horror Nights"}
        >
          <RedditIcon size={36} />
        </RedditShareButton>

        <PinterestShareButton
          url={"#"}
          quote={"Join the Maniacs of Horror Nights"}
          hashtag="#maniacsofhhn"
        >
          <PinterestIcon size={36} />
        </PinterestShareButton>

        <TumblrShareButton
          url={"#"}
          quote={"Join the Maniacs of Horror Nights"}
          hashtag="#maniacsofhhn"
        >
          <TumblrIcon size={36} />
        </TumblrShareButton>
      </div>
    </footer>
  );
};

export default Footer;