import Avatars from "@/components/Avatars";
import UpdateTitle from "@/components/UpdateTitle";
import Editor from "@/components/Editor";
import ManageUsers from "@/components/ManageUsers";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="flex max-w-6xl mx-auto w-full pb-5">
          <UpdateTitle id={id} />
        </div>
        <div className="flex max-w-6xl w-full mx-auto justify-between items-center mb-5">
          <ManageUsers />
          <Avatars />
        </div>

        <hr className="pb-10" />

        <Editor />
      </div>
    </div>
  )
}
export default page
