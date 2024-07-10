import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import console from "console";
import { v4 as uuidv4 } from "uuid";

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
      filename: `videoloader-instagram-${uuidv4()}`,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "social-media-video-downloader.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(
      "https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram",
      options,
    );

    const links = response.data.links
      .filter((el: { quality: string; link: string }) =>
        el.quality.startsWith("hd_"),
      )
      .map((el: { quality: string; link: string }) => el.link);

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
