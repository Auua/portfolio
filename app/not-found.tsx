import Link from 'next/link';
import Button from '@/app/_components/common/Button';

export default function NotFound() {
  return (
    <div className={'page-container--full center'}>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href='/home'><Button>Return Home</Button></Link>
    </div>
  );
}
