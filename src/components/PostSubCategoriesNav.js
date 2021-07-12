import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostSubCategoriesNav.css'

const PostSubCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostSubCategoriesNav">
    <Link className="NavLink" exact="true" to={`/blog/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PostSubCategoriesNav
