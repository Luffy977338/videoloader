"use client";

import axios from "axios";
import { useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import FewVideosAlert from "./FewVideosAlert";
import VideoDownloading from "./VideoDownloading";

export default function InstallInstagramVideoForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadLinks, setDownloadLinks] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setDownloadLinks([]);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/instagram", { url });
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

    if (downloadUrl) {
      try {
        setIsDownloading(true);
        const video = await axios.get(downloadUrl, { responseType: "blob" });
        const videoBlob = new Blob([video.data]);
        const videoBlobUrl = URL.createObjectURL(videoBlob);
        const link = document.createElement("a");
        link.href = videoBlobUrl;
        link.setAttribute("download", `videoloader-instagram-${uuidv4()}.mp4`);
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
            src={"/instagram_logo.png.webp"}
            alt='instagram downloader'
            width={0}
            height={0}
            className='w-[120px]'
            unoptimized
          />
        </div>
        <div className='space-x-4 flex'>
          <input
            type='text'
            placeholder='Enter Instagram Video URL'
            className='input input-bordered w-3/4'
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
          <div className='space-y-4 mt-10'>
            {downloadLinks.map((url, index) => (
              <div key={index} className='flex justify-center'>
                <button
                  onClick={() => handleDownload(url)}
                  className={`btn btn-primary w-[300px]`}
                >
                  Download {downloadLinks.length > 1 ? index + 1 : ""}
                </button>
              </div>
            ))}
            {downloadLinks.length > 1 && (
              <div className='flex justify-center'>
                <FewVideosAlert />
              </div>
            )}
            {!!videoUrl && (
              <div className='flex justify-center'>
                <InstagramEmbed
                  width={300}
                  height={400}
                  embedPlaceholder={
                    <div className={`skeleton w-[300px] h-[400px]`}></div>
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
