import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, RotateCcw, AlertCircle, Heart } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Marisol App ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    try {
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => caches.delete(key));
          location.reload();
        }).catch(() => {
          location.reload();
        });
        return;
      }
    } catch {}
    location.reload();
  };

  private handleResetAndReload = () => {
    try {
      sessionStorage.clear();
      // Keep user login if possible, clear only temporary locks
      localStorage.removeItem('marisol_batch_offline_queue_v2');
      localStorage.removeItem('marisol_chat_offline_queue_v2');
      if ('caches' in window) {
        caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
      }
    } catch {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-4 text-center select-none font-sans">
          <div className="max-w-md w-full bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center mx-auto text-rose-500 shadow-sm">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-display font-black text-stone-900">
                Marisol: Factory of Fun ✨
              </h2>
              <p className="text-xs text-rose-600 font-bold uppercase tracking-wide">
                Comfort Space Recovery Mode
              </p>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              A little digital bump occurred while loading your comfort adventure. Don't worry, your progress and memories are safe!
            </p>

            {this.state.error?.message && (
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <p className="text-[11px] font-mono text-stone-600 line-clamp-2 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl font-display font-black text-xs uppercase shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Comfort Space</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetAndReload}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl font-display font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Stale Cache & Reopen</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
