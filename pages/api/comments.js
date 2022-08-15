// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// // import type { NextApiRequest, NextApiResponse } from 'next'

// // type Data = {
// //   name: string
// // }

// // export default function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse<Data>
// // ) {
// //   res.status(200).json({ name: 'John Doe' })
// // }
// import { GraphQLClient, gql } from "graphql-request"
// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
// const graphcmsToken = process.env.GRAPHCMS_TOKEN

// export default async function comments(req, res) {
//   // console.log({ graphcmsToken })
//   const { name, email, slug, comment } = req.body
//   const graphQLClient = new GraphQLClient(graphqlAPI, {
//     headers: {
//       authorization: `Bearer${graphcmsToken}`
//     }
//   })
//   const query = gql`
//   mutation CreateComment($name: String!,$email:String!, $comment: String!, $slug:String!){
//     createComment(data:{name:$name,email:$email,comment:$comment,post:{connect:{slug:$slug}}}){id}
//   }
//   `
//   try {
//     const result = await graphQLClient.request(query, req.body)
//     return res.status(200).send(result);
//   } catch (error) {
//     console.log(error)
//     return res.status(500).send(error);

//   }

// }



import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
  mutation CreateComment($name: String!,$email:String!, $comment: String!, $slug:String!){
    createComment(data:{name:$name,email:$email,comment:$comment,post:{connect:{slug:$slug}}}){id}
  }
  `

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  // return res.status(200).send(result);
  try {
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);

  }
}