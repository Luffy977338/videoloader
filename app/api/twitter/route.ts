import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import console from "console";

interface IVideo {
  bitrate: number;
  content_type: string;
  url: string;
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: { message: "URL is required" } },
      { status: 400 },
    );
  }

  const options = {
    params: {
      url: url,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host":
        "twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(
      "https://twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com/status",
      options,
    );

    const links = response.data.media.video.videoVariants
      .filter((el: IVideo) => el.content_type === "video/mp4")
      .sort((a: IVideo, b: IVideo) => b.bitrate - a.bitrate);

    console.log(links);

    return NextResponse.json(
      {
        downloadUrl: links,
        srcUrl: url,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Video not found" } },
      { status: 404 },
    );
  }
}
