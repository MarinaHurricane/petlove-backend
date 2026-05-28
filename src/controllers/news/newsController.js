import { News } from "../../models/news.js";

export const getNews = async(req, res) => {
  const{page, perPage = 6, search} = req.query;
  const skip = (page - 1) * perPage;

  const newsQuery = News.find();

   if (search) {
    newsQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { text: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const [totalNews, news] = await Promise.all([
    newsQuery.clone().countDocuments(),
    newsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNews / perPage);

  res.status(200).json({page, perPage, totalPages, totalNews, news});
};
