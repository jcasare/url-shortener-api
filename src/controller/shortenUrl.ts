import express from "express";
import { urlModel } from "../model/shortenUrl.model";

export const getAllUrls = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length < 0) {
      return res.status(404).json({ msg: "No short urls found" });
    }
    return res.status(200).json(shortUrls);
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "No url selected" });
    }
    const shortUrl = await urlModel.findOne({ shortUrl: id });
    if (!shortUrl) {
      return res.status(400).json({ msg: "Full url not found" });
    }
    shortUrl.clicks++;
    shortUrl.save();
    return res.redirect(`${shortUrl.fullUrl}`);
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const existingUrl = await urlModel.find({ fullUrl });
    if (existingUrl && existingUrl.length > 0) {
      return res.status(409).json({ url: existingUrl });
    }
    const newUrl = await urlModel.create({ fullUrl });
    return res.status(200).json({ url: newUrl });
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "No url selected" });
    }
    const shortUrl = await urlModel.findByIdAndDelete({ _id: id });
    if (shortUrl) {
      return res
        .status(204)
        .json({ msg: `Url with id ${id} deleted successfully!!` });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};
