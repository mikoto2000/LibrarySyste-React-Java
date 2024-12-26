import { useEffect, useMemo, useState } from "react";
import { LendingSetEntityControllerApiFactory, Configuration, EntityModelLendingSet } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type LendingSetDetailPageProps = {
};

export const LendingSetDetailPage: React.FC<LendingSetDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => LendingSetEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [lendingSet, setLendingSet] = useState<EntityModelLendingSet | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        console.log(api);

        const lendingSetResult = await api.getItemResourceBookmasterGet({
          id
        });

        setLendingSet(lendingSetResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceBookmasterDelete({ id }).finally(() => {
        navigate("/lendingSets");
      });
    }
  }

  return (
    lendingSet
      ?
      <>
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{(lendingSet as any).id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{lendingSet.name}</td>
            </tr>
            <tr>
              <td>Publication Date:</td>
              <td>{lendingSet.publicationDate}</td>
            </tr>
            <tr>
              <td>authors:</td>
              <td>
                {
                  (lendingSet as any)._embedded.author
                    ?
                    (lendingSet as any)._embedded.author.map((e: any) => e.name).join(", ")
                    :
                    <></>
                }
              </td>
            </tr>
            <tr>
              <td>Ndc Category:</td>
              <td>{(lendingSet as any)._embedded.ndcCategory.name}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete}>削除</button>
        <Link to="/lendingSets">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
