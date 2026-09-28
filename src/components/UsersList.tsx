import { useEffect } from 'react'
import { CloudDownload, ServerCrash, Users } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchUsers } from '../store/slices/usersSlice'

export const UsersList = () => {
  const dispatch = useAppDispatch()
  const { users, status, error } = useAppSelector((state) => state.users)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [dispatch, status])

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-indigo-500/20 rounded-2xl">
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Users Directory</h2>
            <p className="text-slate-400">Data loaded asynchronously from API via Redux Thunk</p>
          </div>
          
          <button 
            onClick={() => dispatch(fetchUsers())}
            className="ml-auto flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors border border-white/5 text-sm font-medium"
          >
            <CloudDownload className="w-4 h-4" />
            Reload Data
          </button>
        </div>

        {status === 'pending' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-400 font-medium animate-pulse">Fetching users...</p>
          </div>
        )}

        {status === 'rejected' && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-red-500/10 rounded-full mb-4">
              <ServerCrash className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-2">Failed to load data</h3>
            <p className="text-slate-400 max-w-md">{error}</p>
          </div>
        )}

        {status === 'fulfilled' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-pointer"
              >
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{user.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{user.email}</p>
                <div className="inline-block px-3 py-1 rounded-lg bg-black/20 text-xs font-medium text-slate-300">
                  {user.company.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
