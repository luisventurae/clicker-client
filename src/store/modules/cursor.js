import io from 'socket.io-client'
const socket = io(process.env.VUE_APP_SERVER_IO)

const state = {
    username: null,
    room: null,
    players: [],
}

const getters = {
    players: store => store.players.filter(p => !p.me),
}

const mutations = {
    SET_USERNAME(state, username) {
        state.username = username
    },
    SET_ROOM(state, room) {
        state.room = room
    },
    SET_PLAYERS(state, players) {
        state.players = players
    },
    ADD_PLAYER(state, player) {
        state.players.push(player)
    },
    QUIT_PLAYER(state, player) {
        state.players = state.players.filter(p => p.username!==player.username)
    },
    SET_POSITION_PLAYER(state, player) {
        const playerFound = state.players.find(p => p.username===player.username)
        playerFound.x = player.x
        playerFound.y = player.y
    }
}

const actions = {

    /**
     * Se une a una Sala
     * @param {vuex}    context 
     * @param {Object}  args 
     * @param {String}  args.room
     * @param {String}  args.username
     */
    joinRoom(context, args) {
        if( !args.room ) return
        const player = {
            room: args.room,
            username: args.username,
            color: '#000',
            x: -100,
            y: -100,
        }
        socket.emit('server:join:room', player)
        context.commit('SET_ROOM', args.room)
        context.commit('SET_USERNAME', args.username)
        context.commit('ADD_PLAYER', { ...player, me: true })
    },
    listenPlayers(context) {
        socket.on('client:new:player', (payload) => {
            console.log('ext',payload)    
            payload.color = 'blue'
            
            context.commit('ADD_PLAYER', payload)
        })    
        socket.on('client:leave:player', (payload) => {
            context.commit('QUIT_PLAYER', payload)
        })    
    },
    emitPosition(context, { x, y }) {
        if( !context.state.room ) return
        // console.log(x,y)    
        socket.emit('server:position', {
            username: context.state.username,
            room: context.state.room,
            x, y,
        })    
    },
    listPlayers(context) {
        socket.on('client:room:players', (players) => {
            players = players.map(p => {
                if( p.username===context.state.username ) {
                    p.me = true
                    p.room = context.state.room
                }
                return p
            })
            context.commit('SET_PLAYERS', players)
        })
    },
    listenPositions(context) {
        socket.on('client:position', (payload) => {
            context.commit('SET_POSITION_PLAYER', payload)
        })    
    },
    leavePlayer(context) {
        if( !context.state.room ) return
        const me = context.state.players.find(p => p.me)
        if( !me) return
        socket.emit('server:leave:player', me)   
        socket.removeListener('client:new:player')
        socket.removeListener('client:leave:player')
        socket.removeListener('client:position')
        context.commit('SET_PLAYERS', [])
        context.commit('SET_ROOM', null)
        context.commit('SET_USERNAME', null)
    }
}

export default {
    actions,
    state,
    mutations,
    getters,
}