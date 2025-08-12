import MemoWriteForm from '../components/MemoWriteForm'
import { useEffect, useState } from 'react'
import { getMemoById } from '../storage/MemoStorage';
import Memo from '../models/Memo';


export default function UpdateMemoScreen({ route }) {
  const memoId = route.params.memoId;
  const [initialMemo, setInitialMemo] = useState(Memo.createEmptyMemo());

  useEffect(() => {
    async function loadMemo(memoId) {
      const fetchedMemo = await getMemoById(memoId);
      setInitialMemo(fetchedMemo);
    }

    loadMemo(memoId);
  }, [memoId])

  return (
    <MemoWriteForm 
      initialMemo={initialMemo}
    />
  )
}