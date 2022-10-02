const prisma = require("../prisma/index");

exports.createPost = async (req, res, next) => {
  try {
    // we are going to take these things from frontend
    const { slug, title, body, authorId } = req.body;
    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        // this syntax is for relation between author field and User schema
        author: { connect: { id: authorId } },
      },
    });
    res.json({
      msg: "You made a post",
      result,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    // get the post id from url
    const { id } = req.params;

    // NOTE: if you want value from url like http://localhost/user?id=12 then use req.query and if you want value from a url like http://localhost/user/12 then use req.params

    // get the title and body from body
    const { title, body } = req.body;
    const result = await prisma.post.update({
      // this is where clause which will filter the post based on id
      where: {
        id: id,
      },
      // You can use modern js syntax also here as we have used in other functions
      data: {
        title: title,
        body: body,
      },
    });
    res.json(result);
  } catch (error) {
    res.json("Unable to update!");
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    // here we are deleting on the basis of id
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.json({
      msg: "Your post has been deleted successfully!",
    });
  } catch (error) {
    res.json("Post with given id doesn't exists!");
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (error) {
    res.json("No post was found!");
  }
};
