import React, { useEffect, useRef } from "react";
import styles from "./VideoPlayer.module.css";

// Declare global variables for the YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

type VideoPlayerProps = {
  videoSrc: string;
  onTimeUpdate: (time: number) => void; // Ensure this is a function type that accepts a number
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  onTimeUpdate,
}) => {
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    // This function will be called once the YouTube IFrame API is ready
    window.onYouTubeIframeAPIReady = function () {
      if (typeof window.YT !== "undefined" && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-player", {
          height: "315",
          width: "560",
          videoId: videoSrc.split("/").pop(),
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    // Load the YouTube IFrame API script if it's not already present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    } else {
      window.onYouTubeIframeAPIReady();
    }

    // Clean up function
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoSrc]);

  // Handler when the player is ready
  const onPlayerReady = (event: YT.PlayerEvent) => {
    // Set up an interval to update the current time
    setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime();
        onTimeUpdate(time);
      }
    }, 1000); // Update every second
  };

  // Handler for player's state change
  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    // You can handle different states here, e.g., when video ends
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log("Video has ended.");
    }
  };

  return (
    <div className={styles.videoPlayer}>
      {/* Correctly use the id for the div that will contain the YouTube player */}
      <div id="youtube-player"></div>
    </div>
  );
};

export default VideoPlayer;
