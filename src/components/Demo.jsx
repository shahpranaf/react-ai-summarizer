import React, { useEffect, useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../store';

function Demo() {
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });
    const [allArticles, setAllArticles] = useState([]);
    const [copiedUrl, setCopiedUrl] = useState("");

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, [])

    const handleChange = (e) => {
        setArticle({
            ...article,
            url: e.target.value
        })
    }
    
    const handleCopy = (e, copyUrl) => {
        e.preventDefault();
        setCopiedUrl(copyUrl);
        navigator.clipboard.writeText(copyUrl);

        setTimeout(() => setCopiedUrl(""), 1000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await getSummary(article);

        // const data = {
        //     "summary": "Adrian, the founder and CEO of JavaScript Mastery, leads a programming community with over 500,000 followers and subscribers. This community aims to help individuals enhance their programming skills and acquire the necessary tools for lucrative employment opportunities in software development. Adrian's journey began five years ago when he faced a challenge while learning React.js for a project. He realized that the available courses focused more on theory rather than practical experience, leaving him confused and demotivated. Determined to find a better approach, he discovered the most effective way to learn and master any programming language. Now, he shares his knowledge with hundreds of thousands of aspiring developers, helping them secure their dream jobs or start their own businesses. Adrian's ultimate goal is to guide individuals towards becoming master developers, instilling confidence in their coding abilities, and enabling them to pursue high-paying careers.\n\nIn summary, Adrian, the founder and CEO of JavaScript Mastery, leads a programming community that assists individuals in improving their programming skills and gaining the necessary tools for successful careers in software development. Adrian's personal experience of struggling with traditional courses led him to discover a more practical approach to learning programming languages. He now teaches hundreds of thousands of aspiring developers, empowering them to achieve their career goals and become confident master developers."
        // }

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
            console.log(newArticle)
        }
    }

    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className='flex flex-col w-full gap-2'>
                <form onSubmit={handleSubmit} className='relative flex justify-center items-center'>
                    <img src={linkIcon} alt="link_icon" className='absolute left-0 my-2 ml-3 w-5' />
                    <input type='url' placeholder='Enter a URL'
                        value={article.url}
                        onChange={handleChange}
                        required
                        className='url_input peer' />
                    <button type="submit" className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>⏎</button>
                </form>

                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((article, index) => (
                        <div key={`link-${index}`}
                            onClick={() => setArticle(article)}
                            className='link_card'>

                            <div className='copy_btn' onClick={(e) => handleCopy(e, article.url)}>
                                <img src={copiedUrl === article.url ? tick : copy}  alt="copy-icon" className='w-[40%] h-[40%] object-contain' />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{article.url}</p>
                        </div>
                    ))}

                </div>

                <div className='my-10 max-w-full flex justify-center items-center'>
                    {
                        isFetching ? (
                            <img src={loader} alt="loader" className='w-20 h-20 object-contain' />
                        ) : error ? (
                            <p className='font-inter font-bold text-black text-center'>
                                Well, that wasn't support to happen!!
                                <br />
                                <span className='font-satoshi font-normal text-gray-700'>{error?.data?.error}</span>
                            </p>
                        )
                            : <div className='flex flex-col gap-3'>
                                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                    Article  <span className='blue_gradient'>Summary</span>
                                </h2>
                                <div className='summary_box'>
                                    <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                                </div>
                            </div>
                    }
                </div>

            </div>
        </section>
    )
}

export default Demo