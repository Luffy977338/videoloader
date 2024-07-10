"use client";

import axios from "axios";
import { useState } from "react";
import { YouTubeEmbed } from "react-social-media-embed";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import FewVideosAlert from "./FewVideosAlert";
import VideoDownloading from "./VideoDownloading";

export default function InstallYoutubeVideoForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<
    Record<"quality" | "link", string>[]
  >([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (isLoading) return;

    setError("");
    setDownloadLinks([]);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/youtube", { url });
      console.log(response);
      if (response.status === 200) {
        setVideoUrl(response.data.srcUrl);
        setDownloadLinks(response.data.downloadUrl);
        setUrl("");
      }
    } catch (error) {
      console.log(error);
      setError(
        (error as any).response?.data?.error.message || "An error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (downloadUrl: string) => {
    if (isDownloading) return;
    console.log(downloadUrl);

    if (downloadUrl) {
      try {
        setIsDownloading(true);
        const video = await axios.get(downloadUrl, { responseType: "blob" });
        const videoBlob = new Blob([video.data]);
        const videoBlobUrl = URL.createObjectURL(videoBlob);
        const link = document.createElement("a");
        link.href = videoBlobUrl;
        link.setAttribute("download", `youtube-${uuidv4()}.mp4`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } catch (error) {
        console.log(error);
        setError(
          (error as any).response?.data?.error.message || "An error occurred",
        );
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='w-[500px]'>
        <div className='flex justify-center mb-10'>
          <Image
            src={"/youtube_logo.png"}
            alt='youtube downloader'
            width={0}
            height={0}
            className='w-[120px]'
            unoptimized
          />
        </div>
        <div className='space-x-4 flex'>
          <input
            type='text'
            className='input input-bordered w-3/4'
            placeholder='Enter Youtube Video URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className='btn btn-secondary w-1/4' onClick={handleSearch}>
            {isLoading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
        {isDownloading && (
          <>
            <VideoDownloading />
          </>
        )}
        {!!downloadLinks.length && (
          <div className='mt-10 space-y-4'>
            {downloadLinks.map((url, index) => (
              <div key={index} className='flex justify-center'>
                <button
                  onClick={() => handleDownload(url.link)}
                  className={`btn btn-primary w-[300px]`}
                >
                  Download {url.quality.replace("render_", "")}
                </button>
              </div>
            ))}
            {!!videoUrl && (
              <div className='flex justify-center'>
                <YouTubeEmbed
                  width={
                    videoUrl.startsWith("https://www.youtube.com/shorts")
                      ? 260
                      : 500
                  }
                  height={
                    videoUrl.startsWith("https://www.youtube.com/shorts")
                      ? 460
                      : 300
                  }
                  embedPlaceholder={
                    <div className='skeleton w-full h-full'></div>
                  }
                  url={videoUrl}
                />
              </div>
            )}
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
