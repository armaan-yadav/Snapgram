import { useUserContext } from "@/components/context/AuthContext";
import { Input } from "@/components/ui/input";
import { useGetAllUsers } from "@/lib/tanstack-query/queriesAndMutations";
import React, { useState } from "react";

const AllUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useUserContext();
  const { data: allUsers } = useGetAllUsers();
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search People</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="" width={24} height={24} />
          <Input
            className="explore-search"
            placeholder="Search for people"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
