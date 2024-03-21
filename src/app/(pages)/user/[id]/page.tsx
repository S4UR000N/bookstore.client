'use client'
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import BookUserIdModel from "../../../models/user/BookUserIdModel";
import UpdateBooksOnUserRequestModel from "../../../models/request/UpdateBooksOnUserRequestModel";
import BookFormModel from "../../../models/form/BookFormModel";
import BookService from "../../../services/BookService";

export default function User({ params }: { params: { id: number } }) {
    const navHeight = {
        width: '100%',
        height: '56px'
    }

    const [books, setBooks] = useState<BookUserIdModel[]>();
    let [addRemoveBooks, setAddRemoveBooks] = useState<UpdateBooksOnUserRequestModel>();
    const [showAddBookForm, setShowAddBookForm] = useState<boolean>(false);
    const [form, setForm] = useState(new BookFormModel());

    function ToggleBook(id: number, fn: "Add"|"Remove", event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        let el = event.currentTarget as HTMLElement;
        if (el.innerText == "Add") {
            el.innerText = "Remove";
        }
        else {
            el.innerText = "Add";
        }
        if (fn == "Add") {
            if (addRemoveBooks?.AddBooks.includes(id)) {
                addRemoveBooks.AddBooks = addRemoveBooks?.AddBooks.filter(b => b !== id);
                setAddRemoveBooks(addRemoveBooks);
            }
            else {
                addRemoveBooks?.AddBooks.push(id);
                setAddRemoveBooks(addRemoveBooks);
            }
        }
        else if (fn == "Remove") {
            if (addRemoveBooks?.RemoveBooks.includes(id)) {
                addRemoveBooks.RemoveBooks = addRemoveBooks?.RemoveBooks.filter(b => b !== id);
                setAddRemoveBooks(addRemoveBooks);
            }
            else {
                addRemoveBooks?.RemoveBooks.push(id);
                setAddRemoveBooks(addRemoveBooks);
            }
        }
    }

    function CommitChanges() {
        if (addRemoveBooks.AddBooks.length > 0 || addRemoveBooks.RemoveBooks.length > 0)
        {
            UserService.PostUpdateBooksOnUser(addRemoveBooks).then(res => res ? alert("Commit successful") : alert("Commit failed"));
        }
        else {
            alert("No changes to commit")
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        BookService.PostUpdateBooksOnUser(form)
        .then(res => res ? alert("Book saved") : alert("Save failed"))
        .then(() => setShowAddBookForm(false))
        .then(() => {
            UserService.GetBooksUserId(params.id)
            .then(bs => {
                setBooks(bs);
                setAddRemoveBooks(new UpdateBooksOnUserRequestModel(params.id, [], []));
            });
        });
    }

    useEffect(() => {
        UserService.GetBooksUserId(params.id)
            .then(bs => {
                setBooks(bs);
                setAddRemoveBooks(new UpdateBooksOnUserRequestModel(params.id, [], []));
            });
        },
    []); 

    return books?.length > 0
    ? (<section>
    <div style={navHeight}></div>
    <div className="relative overflow-x-auto">
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
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                        <td className="px-6 py-4">{book.id}</td>
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4">{book.author}</td>
                        <td className="px-6 py-4">{book.year}</td>
                        {book.users.some(u => u.id == params.id)
                        ? <td className="px-6 py-4">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={(e) => ToggleBook(book.id, "Remove", e)}>Remove
                            </button>
                        </td>
                        : <td className="px-6 py-4">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={(e) => ToggleBook(book.id, "Add", e)}>Add
                            </button>
                        </td>

                        }
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <div className="flex flex-col items-center m-3"><button onClick={CommitChanges}
    className="self-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        Commit Changes
    </button></div>

    <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>

    {!showAddBookForm
    ?
    <div className="flex flex-col items-center m-3"><button onClick={() => setShowAddBookForm(true)} className="self-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        Add Book
    </button></div>
    :
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Add Book
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input minLength={1} type="text" name="title" id="title" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Harry potta"
                            value={form.title}
                            onChange={e => {
                                setForm(formState => {
                                  formState.title = e.target.value
                                  return formState
                                })
                              }
                            }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <input minLength={8} type="text" name="description" id="description" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="Harry potta"
                             value={form.description}
                              onChange={e => {
                                setForm(formState => {
                                  formState.description = e.target.value
                                  return formState
                                })
                              }
                            }
                             />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                            <input minLength={4} type="text" name="author" id="author" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="Harry potta"
                             value={form.author}
                              onChange={e => {
                                setForm(formState => {
                                  formState.author = e.target.value
                                  return formState
                                })
                              }
                            }
                             />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                            <input minLength={4} type="test" name="year" id="year" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="2024"
                             value={form.year}
                              onChange={e => {
                                setForm(formState => {
                                  formState.year = e.target.value
                                  return formState
                                })
                              }
                            }
                             />
                        </div>
                        <button type="submit" className="w-full text-white
                          bg-gray-700 
                          hover:bg-gray-600 
                          focus:ring-4 focus:outline-none focus:ring-primary-300 
                          font-medium rounded-lg
                          text-sm px-5 py-2.5 text-center
                          dark:bg-primary-400
                          dark:hover:bg-primary-700
                          dark:focus:ring-primary-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    }
    </section>)
    : (<><div style={navHeight}></div><div className="text-white text-center">No Books in the database.</div></>)
  }