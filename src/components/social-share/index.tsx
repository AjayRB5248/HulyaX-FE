import Link from "next/link";

interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "Facebook",
    icon: "fab fa-facebook-f",
    url: "https://www.facebook.com/profile.php?id=61555048269687&mibextid=LQQJ4d",
  },
  {
    name: "Instagram",
    icon: "fab fa-instagram",
    url: "https://www.instagram.com/events.hulya?igshid=dDZsdWFmNmQ0b2tw&utm_source=qr",
  },
  { name: "GooglePlus", icon: "fab fa-google-plus-g", url: "mailto:info@hulyaevents.com.au" },
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
