import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import console from "console";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: { message: "URL is required" } },
      { status: 400 },
    );
  }

  const options = {
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "facebook-media-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  const urlObject = new URL(url);

  const isReels = urlObject.href.startsWith("https://www.facebook.com/reel/");
  const isStories = urlObject.href.startsWith(
    "https://www.facebook.com/stories/",
  );
  const isDefaultVideo =
    urlObject.href.startsWith("https://www.facebook.com/watch/") &&
    urlObject.searchParams.get("v");

  function extractVideoId() {
    if (isReels) {
      const pathParts = urlObject.pathname.split("/");
      return pathParts[pathParts.length - 1];
    }

    if (isDefaultVideo) {
      return urlObject.searchParams.get("v");
    }

    if (isStories) return url;

    return null;
  }

  const video_id = extractVideoId();

  console.log(video_id);

  if (!video_id) {
    return NextResponse.json(
      { error: { message: "invalid url" } },
      { status: 400 },
    );
  }

  try {
    let response;

    if (isStories) {
      response = await axios.post(
        "https://facebook-media-api.p.rapidapi.com/media/stories",
        { video_id },
        options,
      );
    } else {
      response = await axios.post(
        "https://facebook-media-api.p.rapidapi.com/media/reels",
        { video_id },
        options,
      );
    }

    const links = isStories
      ? []
      : [response.data.data.video.playable_url_quality_hd];

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
