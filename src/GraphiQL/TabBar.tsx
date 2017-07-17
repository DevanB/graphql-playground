import * as React from 'react'
import { Session } from '../types'
import { Icon, $v } from 'graphcool-styles'

export interface Props {
  sessions: Session[]
  selectedSessionIndex: number
  onNewSession: any
  onCloseSession: (session: Session) => void
  onOpenHistory: Function
  onSelectSession: (session: Session) => void
  onboardingStep?: string
  tether?: any
  nextStep?: () => void
}

export const TabBar = ({
  sessions,
  selectedSessionIndex,
  onNewSession,
  onSelectSession,
  onOpenHistory,
  onCloseSession,
  onboardingStep,
  tether,
  nextStep,
}: Props) => {
  const Tether = tether

  return (
    <div className="root">
      <style jsx={true}>{`
        .root {
          @inherit: .white, .z4;
          height: 57px;
          background-color: $darkBlueGray;

          path {
            stroke: white;
          }
        }

        .tabs {
          @inherit: .mt16, .ml16, .flex, .itemsCenter;
          height: 41px;
        }

        .tab {
          @inherit: .flex,
            .itemsCenter,
            .bgDarkerBlue,
            .br2,
            .brTop,
            .ml10,
            .bbox,
            .pointer;
          height: 43px;
          padding: 10px;
          padding-top: 9px;
          &.active {
            @inherit: .bgDarkBlue;
          }
        }

        .icons {
          @inherit: .flex, .itemsCenter, .o50;
          &.active {
            @inherit: .o100;
          }
        }

        .red-dot {
          @inherit: .br100, .bgrRed, .mr10;
          width: 7px;
          height: 7px;
        }

        .query-types {
          @inherit: .flex, .itemsCenter;
          margin-right: 2px;
        }

        .query-type {
          @inherit: .br2, .flex, .itemsCenter, .justifyCenter, .mr4, .fw7, .f12;
          height: 21px;
          width: 21px;
        }

        .subscription {
          @inherit: .bgPurple;
        }

        .query {
          @inherit: .bgBlue;
        }

        .mutation {
          @inherit: .bgLightOrange;
        }

        .viewer {
          @inherit: .mr10;
        }

        .operation-name {
          @inherit: .o50;
          &.active {
            @inherit: .o100;
          }
        }

        .close {
          @inherit: .ml10, .o50;
          &.active {
            @inherit: .o100;
          }
        }

        .plus {
          @inherit: .flex, .justifyCenter, .itemsCenter;
          width: 43px;
        }

        .history {
          @inherit: .pointer;
        }
      `}</style>
      <div className="tabs">
        <div className="history">
          <Icon
            className="icon"
            src={require('graphcool-styles/icons/stroke/history.svg')}
            stroke={true}
            strokeWidth={3}
            width={25}
            height={25}
            color={$v.white40}
            onClick={onOpenHistory}
          />
        </div>
        {sessions.map((session, index) => {
          const { queryTypes } = session
          return (
            <div
              key={session.id}
              className={`tab ${index === selectedSessionIndex && 'active'}`}
              onClick={() => onSelectSession(session)}
            >
              <div
                className={`icons ${index === selectedSessionIndex &&
                  'active'}`}
              >
                {session.subscriptionActive && <div className="red-dot" />}
                <div className="query-types">
                  {queryTypes.query &&
                    <div className="query-type query">Q</div>}
                  {queryTypes.mutation &&
                    <div className="query-type mutation">M</div>}
                  {queryTypes.subscription &&
                    <div className="query-type subscription">S</div>}
                </div>
                {session.selectedViewer !== 'ADMIN' &&
                  <div className="viewer">
                    {session.selectedViewer === 'EVERYONE' &&
                      <Icon
                        src={require('graphcool-styles/icons/fill/world.svg')}
                        color={$v.white40}
                        width={14}
                        height={14}
                      />}
                    {session.selectedViewer === 'USER' &&
                      <Icon
                        src={require('graphcool-styles/icons/fill/user.svg')}
                        color={$v.white40}
                        width={14}
                        height={14}
                      />}
                  </div>}
              </div>
              {tether &&
              onboardingStep === 'STEP3_SELECT_QUERY_TAB' &&
              index === 0
                ? <Tether
                    steps={[
                      {
                        step: 'STEP3_SELECT_QUERY_TAB',
                        title: 'Back to the query',
                        description:
                          "After creating the data with our mutations, let's see what we got",
                      },
                    ]}
                  >
                    <div
                      className={`operation-name ${index ===
                        selectedSessionIndex && 'active'}`}
                    >
                      {session.operationName ||
                        queryTypes.firstOperationName ||
                        'New Session'}
                    </div>
                  </Tether>
                : <div
                    className={`operation-name ${index ===
                      selectedSessionIndex && 'active'}`}
                  >
                    {session.operationName ||
                      queryTypes.firstOperationName ||
                      'New Session'}
                  </div>}
              <div
                className={`close ${index === selectedSessionIndex &&
                  'active'}`}
                onClick={(e: any) => {
                  // we don't want selectIndex to be executed
                  e.stopPropagation()
                  onCloseSession(session)
                }}
              >
                <Icon
                  src={require('graphcool-styles/icons/stroke/cross.svg')}
                  stroke={true}
                  color={$v.white40}
                  width={11}
                  height={10}
                  strokeWidth={8}
                />
              </div>
            </div>
          )
        })}
        {tether && onboardingStep === 'STEP3_CREATE_MUTATION_TAB'
          ? <Tether
              offsetY={-7}
              steps={[
                {
                  step: 'STEP3_CREATE_MUTATION_TAB',
                  title: 'Apparently, there is no data yet',
                  description: 'Click here to create new data',
                },
              ]}
            >
              <div className="tab plus" onClick={onNewSession}>
                <Icon
                  src={require('graphcool-styles/icons/stroke/add.svg')}
                  color="rgba(255,255,255,.15)"
                  width={34}
                  height={34}
                  stroke={true}
                  strokeWidth={4}
                />
              </div>
            </Tether>
          : <div className="tab plus" onClick={onNewSession}>
              <Icon
                src={require('graphcool-styles/icons/stroke/add.svg')}
                color="rgba(255,255,255,.15)"
                width={34}
                height={34}
                stroke={true}
                strokeWidth={4}
              />
            </div>}
      </div>
    </div>
  )
}
