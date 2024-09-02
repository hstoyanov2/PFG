import { GraphQLBackend } from '@lib/api/graphql';
import CreateCarForm from '../components/CreateForm';

export default async function Edit() {
  const brand = await GraphQLBackend.GetModification()
  
  return (
    <div className="flex w-full justify-center mt-16">
      <CreateCarForm />
    </div>
  )
}