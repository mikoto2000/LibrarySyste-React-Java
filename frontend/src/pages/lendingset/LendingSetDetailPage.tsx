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

        const lendingSetResult = await api.getItemResourceLendingsetGet({
          id
        });

        setLendingSet(lendingSetResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceLendingsetDelete({ id }).finally(() => {
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
              <td>Books:</td>
              <td>{(lendingSet as any)._embedded?.bookStock?.map((e: any) => e.bookMaster.name).join(", ")}</td>
            </tr>
            <tr>
              <td>Lend Start Date:</td>
              <td>{lendingSet.lendStartDate}</td>
            </tr>
            <tr>
              <td>Lend Deadline Date:</td>
              <td>{lendingSet.lendDeadlineDate}</td>
            </tr>
            <tr>
              <td>Return Date:</td>
              <td>{lendingSet.returnDate}</td>
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
