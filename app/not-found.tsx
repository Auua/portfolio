import Link from 'next/link';
import Header from '@/app/_components/common/Header';
import Icon from '@/app/_components/common/Icon';

export default function NotFound() {
  return (
    <div className={'page-container--full height center bg-primary'}>
      <main className={'main__page'}>
        <Header title={'Not found'}><Icon icon={['fas', 'magnifying-glass']} style={{ height: '3rem' }} /></Header>
        <p>Could not find requested resource</p>
        <Link className={'btn'} href='/home'>Return Home</Link>
      </main>
    </div>
  );
}
