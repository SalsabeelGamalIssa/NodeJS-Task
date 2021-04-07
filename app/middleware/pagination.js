function paginate(model) {
    return (req, res, next) => {
      const page = parselnt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startlndex = (page - 1) * limit;
      const endlndex = page * limit;
  
      const result = {};
      if (endlndex < modeL.length) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
        if (startlndex > 0) {
          result.previous = {
            page: page - 1,
            limit: limit,
          };
        }
        result.results = model.slice(startIndex, endlndex);
        res.paginatedResult = result;
        next();
      }
    };
  }

  module.exports ={
    paginate
  }