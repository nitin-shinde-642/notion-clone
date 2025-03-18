"use client";

import NewDocumentButton from "./NewDocumentButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { CSSProperties, useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { GroupedData, RoomDocument } from "@/typing";
import MenuItem from "./MenuItem";

function Sidebar() {
  const { user } = useUser();
  const [data] = useCollection(
    user &&
    query(
      collectionGroup(db, "rooms"),
      where("userId", "==", user?.primaryEmailAddress?.emailAddress)
    )
  );

  const [groupedData, setGroupedData] = useState<GroupedData>({
    editor: [],
    owner: [],
  });

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<GroupedData>(
      (acc, doc) => {
        const roomData = doc.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({ id: doc.id, ...roomData });
        } else if (roomData.role === "editor") {
          acc.editor.push({ id: doc.id, ...roomData });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setGroupedData(grouped);
  }, [data]);


  const menuOptions = (
    <>
      <NewDocumentButton />

      {/* My Documents */}
      <h2 className="dark:text-gray-200 font-semibold text-md my-2">My Documents</h2>
      {groupedData.owner.length ? (
        groupedData.owner.map(
          doc => <MenuItem key={doc.id} id={doc.id} />
        )
      ) : (
        <p className="text-gray-500 font-semibold text-sm">
          No Documents Found!
        </p>
      )}
      {/* Shared with Me */}
      {groupedData.editor.length > 0 && (
        <>
          <h2 className="dark:text-gray-200 font-semibold text-md my-2">Shared with Me</h2>
          {groupedData.editor.map(doc => <MenuItem key={doc.id} id={doc.id} />)}
        </>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 dark:bg-gray-900 relative md:max-w-64 md:w-full">
      <div className="md:hidden">
        <Drawer direction="left">
          <DrawerTrigger>
            <MenuIcon className="p-2 rounded-lg hover:opacity-30" size={40} />
          </DrawerTrigger>
          <DrawerContent
            className="left-2 top-2 bottom-2 mt-auto fixed outline-none max-w-[350px] flex [&]:after:!bg-transparent rounded-[10px] dark:bg-gray-950 bg-gray-100"
            style={
              { "--initial-transform": "calc(100% + 10px)" } as CSSProperties
            }
          >
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 overflow-auto text-black dark:text-white">
              {menuOptions}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
export default Sidebar;
