import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className='flex justify-center'>
      <small className='text-muted-foreground'>
        Created by
        <Button
          variant='link'
          className='text-muted-foreground text-xs px-1'
          asChild
        >
          <Link
            href=''
            target='_blank'
            rel='noopener noreferrer'
          >
            Yeti
          </Link>
        </Button>
        &copy; {new Date().getFullYear()}.
      </small>
    </footer>
  );
}
