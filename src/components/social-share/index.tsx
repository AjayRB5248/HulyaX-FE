import Link from "next/link";

interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
}

const socialPlatforms: SocialPlatform[] = [
  { name: "Facebook", icon: "fab fa-facebook-f", url: "https://www.facebook.com/sharer/sharer.php?u=" },
  { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com/intent/tweet?url=" },
  { name: "Pinterest", icon: "fab fa-pinterest-p", url: "https://pinterest.com/pin/create/button/?url=" },
  { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/shareArticle?url=" },
  { name: "GooglePlus", icon: "fab fa-google-plus-g", url: "https://plus.google.com/share?url=" },
];

interface SocialShareProps {
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url }) => {
  return (
    <ul className="social-share">
      {socialPlatforms.map((platform) => (
        <li key={platform.name}>
          <Link href={platform.url + encodeURIComponent(url)} legacyBehavior>
            <a target="_blank">
              <i className={platform.icon}></i>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialShare;
