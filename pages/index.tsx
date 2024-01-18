import clientPromise from '../lib/mongodb'
import { useRouter } from 'next/router'; // Add this import
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useUserContext } from './UserContext';
import Welcome from './Welcome';
type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {


  console.log(useUserContext())
   const { updateUserEmail } = useUserContext();
  const router = useRouter(); // Add this line

  const navigate = (email: string) => {
     updateUserEmail("isdmaifoi"); // Update user email in context
    router.push({
      pathname: '/PassedData',
     // query: { userEmail: email },
    });
  };

  return (
    <div className="container">
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          background-color: #1e1f22;
        }
        * {
          // border: 2px solid purple;
          color: white;
          font-family: system-ui;
          font-weight: 100;
        }

        input {
          color: #060606;
          font-size: 20px;
      
        }
      `}</style>
      <Welcome handleSuccessfulWelcome={() => {}} />
    </div>
  );
}
