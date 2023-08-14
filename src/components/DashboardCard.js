import { List } from 'phosphor-react'
import React from 'react'

const DashboardCard = ({ data, name, route }) => {
    return (
        <div className="col-lg-4 col-md-12 col-6 mb-4">
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                            <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                            />
                        </div>
                        <div className="dropdown">
                            <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <List size={24} />
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                            >
                                <a className="dropdown-item" href={route}>
                                    View More
                                </a>
                            </div>
                        </div>
                    </div>
                    <span>{name}</span>
                    <h3 className="card-title text-nowrap mb-1">
                        {data}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard