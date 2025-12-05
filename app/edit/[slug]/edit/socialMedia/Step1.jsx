"use client";
import React, { useContext } from "react";
import styles from "./step1.module.css";
import Image from "next/image";
import { useState } from "react";
import { MessengerContext } from "./messengerContext";

const Step1 = ({
  setStep,
  step,
  setSection,
  selectedMessenger,
  setSelectedMessenger,
}) => {
  // all messengers for select
  const [socialMedias, setsocialMedias] = useState([
    {
      social: "telegram",
      imageUrl: "/icons/telegram.svg",
      faName: "Telegram Channel",
    },
    {
      social: "instagram",
      imageUrl: "/icons/instagram.svg",
      faName: "Instagram",
    },
    {
      social: "youtube",
      imageUrl: "/icons/youtube.svg",
      faName: "YouTube",
    },
    {
      social: "aparat",
      imageUrl: "/icons/aparat.svg",
      faName: "Aparat",
    },
    {
      social: "twitter",
      imageUrl: "/icons/twitter.svg",
      faName: "Twitter",
    },
    {
      social: "linkedin",
      imageUrl: "/icons/linkedin.svg",
      faName: "LinkedIn",
    },
    {
      social: "facebook",
      imageUrl: "/icons/facebook.svg",
      faName: "Facebook",
    },
    {
      social: "clubhouse",
      imageUrl: "/icons/clubhouse.svg",
      faName: "Clubhouse",
    },
    {
      social: "twitch",
      imageUrl: "/icons/twitch.svg",
      faName: "Twitch",
    },
    {
      social: "patreon",
      imageUrl: "/icons/patreon.svg",
      faName: "Patreon",
    },
    {
      social: "pinterest",
      imageUrl: "/icons/pinterest.svg",
      faName: "Pinterest",
    },
    {
      social: "tiktok",
      imageUrl: "/icons/tiktok.svg",
      faName: "TikTok",
    },
    {
      social: "rubika",
      imageUrl: "/icons/rubika.png",
      faName: "Rubika",
    },
    {
      social: "anker",
      imageUrl: "/icons/anker.png",
      faName: "Anker",
    },
    {
      social: "applemusic",
      imageUrl: "/icons/applemusic.svg",
      faName: "Apple Music",
    },
    {
      social: "breaker",
      imageUrl: "/icons/breaker.svg",
      faName: "Breaker",
    },
    {
      social: "castbox",
      imageUrl: "/icons/castbox.svg",
      faName: "Castbox",
    },
    {
      social: "googlepodcast",
      imageUrl: "/icons/googlepodcast.svg",
      faName: "Google Podcast",
    },
    {
      social: "itunes",
      imageUrl: "/icons/itunes.svg",
      faName: "iTunes",
    },
    {
      social: "applepodcast",
      imageUrl: "/icons/applepodcast.svg",
      faName: "Apple Podcast",
    },
    {
      social: "overcast",
      imageUrl: "/icons/overcast.svg",
      faName: "Overcast",
    },
    {
      social: "pocketcasts",
      imageUrl: "/icons/pocketcasts.svg",
      faName: "Pocket Casts",
    },
    {
      social: "podbean",
      imageUrl: "/icons/podbean.svg",
      faName: "Podbean",
    },
    {
      social: "radiopublic",
      imageUrl: "/icons/radiopublic.svg",
      faName: "Radio Public",
    },
    {
      social: "soundcloud",
      imageUrl: "/icons/soundcloud.svg",
      faName: "SoundCloud",
    },
    {
      social: "spotify",
      imageUrl: "/icons/spotify.svg",
      faName: "Spotify",
    },
    {
      social: "stitcher",
      imageUrl: "/icons/stitcher.svg",
      faName: "Stitcher",
    },
    {
      social: "bazar",
      imageUrl: "/icons/bazar.svg",
      faName: "Bazar",
    },
    {
      social: "googleplay",
      imageUrl: "/icons/googleplay.svg",
      faName: "Google Play",
    },
    {
      social: "applestore",
      imageUrl: "/icons/applestore.svg",
      faName: "Apple Store",
    },
    {
      social: "micet",
      imageUrl: "/icons/micet.svg",
      faName: "Myket",
    },
    {
      social: "iapps",
      imageUrl: "/icons/iapps.svg",
      faName: "iApps",
    },
    {
      social: "sibapp",
      imageUrl: "/icons/sibapp.svg",
      faName: "SibApp",
    },
    {
      social: "dribble",
      imageUrl: "/icons/dribble.svg",
      faName: "Dribbble",
    },
    {
      social: "behance",
      imageUrl: "/icons/behance.svg",
      faName: "Behance",
    },
  ]);

  return (
    <div
      className={styles.step1}
      style={step == 1 ? { top: "2vh" } : {}}>
      {/* header messengers modal page */}
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Social Media</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>
      {/* end header messengers modal page */}

      <div className={styles.messengers}>
        {socialMedias.map((m) => (
          <button
            onClick={() => {
              setStep(2);
              const cloneSelectedMessenger = [...selectedMessenger];
              cloneSelectedMessenger.push({
                social: m.social,
                faName: m.faName,
                imageUrl: m.imageUrl,
                id: Math.floor(Math.random() * 100000),
              });
              setSelectedMessenger(cloneSelectedMessenger);
            }}
            className={styles.messenger}
            style={
              m.social == "telegram"
                ? {
                    backgroundColor: "#e1eff6",
                    border: "1px solid #cccccc",
                  }
                : m.social == "instagram"
                ? {
                    backgroundColor: "#ede2f2",
                    border: "1px solid #cccccc",
                  }
                : m.social == "youtube"
                ? {
                    backgroundColor: "#f7dedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "aparat"
                ? {
                    backgroundColor: "#f5e0e8",
                    border: "1px solid #cccccc",
                  }
                : m.social == "twitter"
                ? {
                    backgroundColor: "#e0eef7",
                    border: "1px solid #cccccc",
                  }
                : m.social == "linkedin"
                ? {
                    backgroundColor: "#dee8f3",
                    border: "1px solid #cccccc",
                  }
                : m.social == "facebook"
                ? {
                    backgroundColor: "#e0ebf6",
                    border: "1px solid #cccccc",
                  }
                : m.social == "clubhouse"
                ? {
                    backgroundColor: "#f7f5e7",
                    border: "1px solid #cccccc",
                  }
                : m.social == "twitch"
                ? {
                    backgroundColor: "#ece5f9",
                    border: "1px solid #cccccc",
                  }
                : m.social == "patreon"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "pinterest"
                ? {
                    backgroundColor: "#f2e1e3",
                    border: "1px solid #cccccc",
                  }
                : m.social == "tiktok"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "rubika"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "anker"
                ? {
                    backgroundColor: "#e5def2",
                    border: "1px solid #cccccc",
                  }
                : m.social == "applemusic"
                ? {
                    backgroundColor: "#f7e2ea",
                    border: "1px solid #cccccc",
                  }
                : m.social == "breaker"
                ? {
                    backgroundColor: "#e0e4f0",
                    border: "1px solid #cccccc",
                  }
                : m.social == "castbox"
                ? {
                    backgroundColor: "#f7e7e3",
                    border: "1px solid #cccccc",
                  }
                : m.social == "googlepodcast"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "itunes"
                ? {
                    backgroundColor: "#f1e5f8",
                    border: "1px solid #cccccc",
                  }
                : m.social == "applepodcast"
                ? {
                    backgroundColor: "#f1e5f8",
                    border: "1px solid #cccccc",
                  }
                : m.social == "overcast"
                ? {
                    backgroundColor: "#f7eae4",
                    border: "1px solid #cccccc",
                  }
                : m.social == "pocketcasts"
                ? {
                    backgroundColor: "#f6e4e5",
                    border: "1px solid #cccccc",
                  }
                : m.social == "podbean"
                ? {
                    backgroundColor: "#ebf2e6",
                    border: "1px solid #cccccc",
                  }
                : m.social == "radiopublic"
                ? {
                    backgroundColor: "#f2e2e3",
                    border: "1px solid #cccccc",
                  }
                : m.social == "soundcloud"
                ? {
                    backgroundColor: "#f6e6e1",
                    border: "1px solid #cccccc",
                  }
                : m.social == "spotify"
                ? {
                    backgroundColor: "#e2f1e8",
                    border: "1px solid #cccccc",
                  }
                : m.social == "stitcher"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "bazar"
                ? {
                    backgroundColor: "#deeee7",
                    border: "1px solid #cccccc",
                  }
                : m.social == "googleplay"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #cccccc",
                  }
                : m.social == "applestore"
                ? {
                    backgroundColor: "#dfe7f7",
                    border: "1px solid #cccccc",
                  }
                : m.social == "micet"
                ? {
                    backgroundColor: "#ddedf7",
                    border: "1px solid #cccccc",
                  }
                : m.social == "iapps"
                ? {
                    backgroundColor: "#dee9f6",
                    border: "1px solid #cccccc",
                  }
                : m.social == "sibapp"
                ? {
                    backgroundColor: "#dfe7f7",
                    border: "1px solid #cccccc",
                  }
                : m.social == "dribble"
                ? {
                    backgroundColor: "#f4e6ed",
                    border: "1px solid #cccccc",
                  }
                : m.social == "behance"
                ? {
                    backgroundColor: "#e0e9f9",
                    border: "1px solid #cccccc",
                  }
                : { border: "1px solid gray" }
            }>
            <Image width={16} height={16} src={m.imageUrl} />
            <span>{m.faName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
