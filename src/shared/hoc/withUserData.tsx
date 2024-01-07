// import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

// interface WithUserDataProps {
//   userData: {
//     email: string;
//     firstName: string;
//     lastName: string;
//     currentRefreshTokenExp: string;
//     role: string;
//     createdAt: string;
//   };
//   // 추가적인 props 타입들이 필요하다면 여기에 정의
// }

// export const withUserData = (
//   PageComponent: any,
//   additionalGetServerSideProps?: GetServerSideProps,
// ) => {
//   const WithUserData = (props: any) => <PageComponent {...props} />;

//   WithUserData.getServerSideProps = async (context: GetServerSidePropsContext) => {
//     const userDataResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/authenticate`, {
//       headers: {
//         Cookie: context.req.headers.cookie || '',
//       },
//     });
//     const res = await userDataResponse.json();

//     const userData = {
//       email: res.data.email,
//       firstName: res.data.firstName,
//       lastName: res.data.lastName,
//       currentRefreshTokenExp: res.data.currentRefreshTokenExp,
//       role: res.data.role,
//       createdAt: res.data.createdAt,
//     };

//     let additionalProps = {};
//     if (additionalGetServerSideProps) {
//       additionalProps = await additionalGetServerSideProps(context);
//     }

//     return { props: { ...additionalProps, userData } };
//   };

//   return WithUserData;
// };
