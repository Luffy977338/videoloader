"use client";

import axios from "axios";
import { useState } from "react";
import { FacebookEmbed } from "react-social-media-embed";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import FewVideosAlert from "./FewVideosAlert";
import VideoDownloading from "./VideoDownloading";

export default function InstallFacebookVideoForm() {
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
      const response = await axios.post("/api/facebook", { url });
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
        const video = await axios.get(downloadUrl, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const videoBlob = new Blob([video.data]);
        const videoBlobUrl = URL.createObjectURL(videoBlob);
        const link = document.createElement("a");
        link.href = videoBlobUrl;
        link.setAttribute("download", `videoloader-facebook-${uuidv4()}.mp4`);
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
            src={"/facebook_logo.png"}
            alt='facebook downloader'
            width={0}
            height={0}
            className='w-[120px]'
            unoptimized
          />
        </div>
        <div className='space-x-4 flex'>
          <input
            type='text'
            placeholder='Enter Facebook Video URL'
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
                  Download
                </button>
              </div>
            ))}
            {!!videoUrl && (
              <div className='flex justify-center'>
                <FacebookEmbed
                  width={500}
                  embedPlaceholder={
                    <div className={`skeleton w-[400px] h-[300px]`}></div>
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
