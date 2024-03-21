'use client'
import { useState, useEffect } from "react";
import UserService from "../services/UserService";
import UserModel from "../models/user/UserModel";

export default function CustomerHome() {
    const [userBooks, setUserBooks] = useState<UserModel>();

    useEffect(() => {
        UserService.GetUserWithBooksById()
            .then(ubs => {console.log(ubs); setUserBooks(ubs)});
    }, []); 
    return userBooks?.books
    ? 
    (<div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Year
                    </th>
                </tr>
            </thead>
            <tbody>
                {userBooks.books.map(book => (
                    <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{book.id}</td>
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4">{book.author}</td>
                        <td className="px-6 py-4">{book.year}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
    : (<div className="text-center text-white">You got no books</div>)
}