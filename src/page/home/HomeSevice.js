import * as service from '../../services/api';

export const getNewsCategory = () => {
  return service.makeGetRequest({
    url: 'api/news-categories'
  });
}