import MemoWriteForm from '../components/MemoWriteForm'
import Memo from '../models/Memo'

export default function CreateMemoScreen({ navigation }) {
  return (
    <MemoWriteForm 
      initialMemo={Memo.createEmptyMemo()} 
      headerTitle="새 메모 작성"
    />
  )
}