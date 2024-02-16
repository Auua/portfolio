import { useRef, useEffect, useCallback } from 'react';
import { useRouter } from '@/i18n';

const useModalClosure = () => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        router.back();
      }
    },
    [router, contentRef],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    },
    [router],
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) =>
      handleClickOutside(event);
    const handleWindowKeydown = (event: KeyboardEvent) => handleKeyDown(event);

    document.addEventListener('mousedown', handleDocumentClick);
    window.addEventListener('keydown', handleWindowKeydown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      window.removeEventListener('keydown', handleWindowKeydown);
    };
  }, [handleKeyDown, handleClickOutside]);

  const closeModal = () => {
    router.back();
  };

  return { contentRef, closeModal };
};

export default useModalClosure;
