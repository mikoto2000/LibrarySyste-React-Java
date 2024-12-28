import { useEffect, useMemo, useState } from "react";
import { AuthorEntityControllerApiFactory, BookMasterEntityControllerApiFactory, Configuration, EntityModelAuthor, EntityModelBookMaster, EntityModelNdcCategory, NdcCategoryEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type BookMasterEditPageProps = {
};

export const BookMasterEditPage: React.FC<BookMasterEditPageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [bookMaster, setBookMaster] = useState<EntityModelBookMaster | undefined>();
  const [author, setAuthor] = useState<EntityModelAuthor[] | undefined>([]);
  const [ndcCategories, setNdcCategories] = useState<EntityModelNdcCategory[] | undefined>([]);

  const api = useMemo(() => BookMasterEntityControllerApiFactory(new Configuration(), BASE_URL), []);


  useEffect(() => {
    (async () => {
      if (id) {
        const bookMasterResult = await api.getItemResourceBookmasterGet({
          id
        });
        setBookMaster(bookMasterResult.data)

        const ndcCategoryApi = NdcCategoryEntityControllerApiFactory(new Configuration(), BASE_URL);
        const ndcCategoryResult = await ndcCategoryApi.getCollectionResourceNdccategoryGet({});
        setNdcCategories(ndcCategoryResult.data._embedded?.ndcCategories);

        const authorApi = AuthorEntityControllerApiFactory(new Configuration(), BASE_URL);
        const authorResult = await authorApi.getCollectionResourceAuthorGet({});
        setAuthor(authorResult.data._embedded?.authors);
      }
    })();
  }, []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (id) {
      console.log(event);
      const form: any = event.currentTarget.form;
      console.log(form);
      const name = form.name.value;
      const authorOptions = form.author.options
      const authors = [];
      for (var i = 0; i < authorOptions.length; i++) {
        console.log(authorOptions[i].selected);
        if (authorOptions[i].selected === true) {
          authors.push(authorOptions[i].value)
        }
      }
      console.log(authors);
      const publicationDate = form.publicationDate.value;
      const ndcCategory = form.ndcCategory.value;

      console.log(JSON.stringify({
        bookMasterRequestBody: {
          name,
          publicationDate,
          authors,
          ndcCategory
        }
      }));


      api.patchItemResourceBookmasterPatch({
        id,
        bookMasterRequestBody: {
          name,
          publicationDate,
          author: authors,
          ndcCategory
        }
      }).then((result) => {
        navigate(`/bookMasters/${(result.data as any).id}`);
      });
    }

  }

  return (
    <>
      {
        bookMaster
          ?
          <form name="register">
            <div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={bookMaster.name}></input>
              </div>
              <div>
                <label>Publication Date:</label>
                <input type="date" name="publicationDate" defaultValue={bookMaster.publicationDate}></input>
              </div>
              <div>
                <label>Author:</label>
                <select name="author" multiple>
                  {
                    author
                      ?
                      author.map((e: any) => <option selected={(bookMaster as any)._embedded.author.find((e2: any) => e.id === e2.id)} value={"/author/" + e.id}>{e.name}</option>)
                      :
                      <></>
                  }
                </select>
              </div>
              <div>
                <label>NdcCategory:</label>
                <select name="ndcCategory">
                  {
                    ndcCategories
                      ?
                      ndcCategories.map((e: any) => <option selected={e.id === (bookMaster as any)._embedded.ndcCategory.id} value={"/ndcCategory/" + e.id}>{e.name}</option>)
                      :
                      <></>
                  }
                </select>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>登録</button>
              </div>
            </div>
          </form>
          :
          <></>
      }
      <Link to="/bookMasters">一覧に戻る</Link>
    </>
  )
}

