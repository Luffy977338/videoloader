import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
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
      filename: `videoloader-youtube-${uuidv4()}`,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "social-media-video-downloader.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(
      "https://social-media-video-downloader.p.rapidapi.com/smvd/get/youtube",
      options,
    );

    console.log(response.data);

    return NextResponse.json(
      {
        downloadUrl: response.data.links.filter(
          (el: { quality: string; link: string }) =>
            el.quality.startsWith("render_"),
        ),
        srcUrl: url,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: { message: "Video not found" } },
      { status: 404 },
    );
  }
}
