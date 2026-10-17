'use client';

import { PokemonDetailView } from '@/components/pokemon/pokemon-detail-view/pokemon-detail-view';
import { FeedbackMessage } from '@/components/ui/feedback-message/feedback-message';
import { Modal } from '@/components/ui/modal/modal';
import { Spinner } from '@/components/ui/spinner/spinner';
import { usePokemonDetail } from '@/hooks/use-pokemon-detail';
import { formatPokemonName } from '@/lib/pokemon-utils';

export interface PokemonDetailModalProps {
  name: string | null;
  onClose: () => void;
}

interface PokemonDetailLoaderProps {
  name: string;
}

function PokemonDetailLoader({ name }: PokemonDetailLoaderProps) {
  const { state, retry } = usePokemonDetail(name);

  if (state.status === 'loading') {
    return (
      <div role="status" className="flex items-center justify-center gap-3 py-16 text-slate-700">
        <Spinner className="h-6 w-6" />
        <span>Carregando detalhes…</span>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <FeedbackMessage
        variant="error"
        title="Não foi possível carregar os detalhes"
        description={state.error.message}
        actionLabel="Tentar novamente"
        onAction={retry}
      />
    );
  }

  return <PokemonDetailView pokemon={state.data} />;
}

export function PokemonDetailModal({ name, onClose }: PokemonDetailModalProps) {
  return (
    <Modal open={name !== null} title={name ? formatPokemonName(name) : ''} onClose={onClose}>
      {name && <PokemonDetailLoader name={name} />}
    </Modal>
  );
}
