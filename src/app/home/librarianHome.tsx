'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserService from "../services/UserService";
import UserModel from "../models/user/UserModel";

export default function LibrarianHome() {
    const router = useRouter();
    const [users, setUsers] = useState<UserModel[]>();

    useEffect(() => {
        UserService.GetUsers()
            .then(us => {
                setUsers(us);
            })
        },
    []); 

    return users?.length > 0
    ? (<div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        FirstName
                    </th>
                    <th scope="col" className="px-6 py-3">
                        LastName
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600" onClick={() => router.push(`user/${user.id}`)}>
                        <td className="px-6 py-4">{user.id}</td>
                        <td className="px-6 py-4">{user.firstName}</td>
                        <td className="px-6 py-4">{user.lastName}</td>
                        <td className="px-6 py-4">{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
    : (<div className="text-center text-white">You got no customers</div>)
}