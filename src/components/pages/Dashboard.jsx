import Card from "../common/StateCard"
import {
    Archive,
    TriangleAlert,
    ClockFading,
    ShoppingCart,
    Plus
 } from "lucide-react"

function Dashboard(){
    return (
        <main className="dashboard-page">
            <h1>Tableau de bord</h1>
           
            <div className="card-container">
                <Card titre="Total SKUs" valeur="210" description="+4 ce mois" icone={<Archive size={24}/>} variant="blue"/>
                <Card titre="Stock Faible" valeur="14" description="Réappro. requis" icone={<TriangleAlert size={24}/>} variant="red"/>
                <Card titre="Lots Expirés" valeur="5" description="Prêt quarantaine" icone={<ClockFading size={24}/>} variant="gray"/>
                <Card titre="Nouveaux Achats" valeur="8" description="brouillon / confirmé" icone={<ShoppingCart size={24}/>} variant="teal"/>
            </div>
        
        <div>
                    <div className="Card">
                        <div className="card-alert">
                            <div className="len-tete">
                                <h3>Alertes de Stock Critique</h3>
                                <h6>Action requise</h6>
                            </div>
                            <div className="Tableau-medicament">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Médicament</th>
                                            <th>Lot ID</th>
                                            <th>Expiration</th>
                                            <th>Stock</th>
                                            <th>FEFO</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Analgésiques</td>
                                            <td>A00300</td>
                                            <td><span className="badge-urgent">urgent</span></td>
                                            <td>25</td>
                                            <td><span className="badge-fefo">1er</span></td>
                                        </tr>

                                        <tr>
                                            <td>Antibiotiques</td>
                                            <td>B02701</td>
                                            <td><span className="badge-urgent">urgent</span></td>
                                            <td>46</td>
                                            <td><span className="badge-fefo">2e</span></td>
                                        </tr>

                                        <tr>
                                            <td>Ibuprofène</td>
                                            <td>B02702</td>
                                            <td><span className="badge-urgent">urgent</span></td>
                                            <td>16</td>
                                            <td><span className="badge-fefo">3e</span></td>
                                        </tr>

                                        <tr>
                                            <td>Ibuprofène</td>
                                            <td>B02704</td>
                                            <td><span className="badge-urgent">urgent</span></td>
                                            <td>15</td>
                                            <td><span className="badge-fefo">4e</span></td>
                                        </tr>

                                        <tr>
                                            <td>Suppléments</td>
                                            <td>B01705</td>
                                            <td><span className="badge-urgent">urgent</span></td>
                                            <td>10</td>
                                            <td><span className="badge-fefo">5e</span></td>
                                        </tr>

                                    </tbody>
                                    
                                </table>

                                <div className="card-alert-link">
                                    <a href="">Réapprovisionner</a>
                                    <a href="">Vérifier la séquence FEFO</a>
                                </div>

                            </div>
                        </div>

                        <div className="card-fofe">

                            <div className="head">
                                <h3>File d'attente FEFO</h3>
                                <select>
                                    <option value="Amoxicilline">Amoxicilline</option>
                                    <option value="Ibuprofene">Ibuprofene</option>
                                    <option value="paracetamol">paracetamol</option>
                                </select>

                            </div>

                            <div className="Tableau-fefo">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Lot ID</th>
                                            <th>Délai exp.</th>
                                            <th>Logique</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>B0101</td>
                                            <td><div className="fefo-barre-fond"> <div className="fefo-barre-remplie">   </div> </div>
                                            </td>
                                            <td>0</td>
                                        </tr>

                                        <tr>
                                            <td>B0102</td>
                                            <td><div className="fefo-barre-fond"> <div className="fefo-barre-remplie">   </div> </div></td>
                                            <td>0</td>
                                        </tr>

                                        <tr>
                                            <td>B0104</td>
                                            <td><div className="fefo-barre-fond"> <div className="fefo-barre-remplie">   </div> </div></td>
                                            <td>0</td>
                                        </tr>

                                        <tr>
                                            <td>B0205</td>
                                            <td><div className="fefo-barre-fond"> <div className="fefo-barre-remplie">   </div> </div></td>
                                            <td>0</td>
                                        </tr>

                                        <tr>
                                            <td>B0149</td>
                                            <td><div className="fefo-barre-fond"> <div className="fefo-barre-remplie">   </div> </div></td>
                                            <td>0</td>
                                        </tr>

                                        <tr>
                                            <td>B0110</td>
                                            <td><div className="fefo-barre-fond"> <div className="fefo-barre-remplie">   </div> </div></td>
                                            <td>0</td>
                                        </tr>

                                    </tbody>
                                </table>

                                <div className="link-card-fefo">
                                    <p>Règle : FEFO Stricte</p>
                                    <a href="http://">Configurer</a>
                                </div>

                            </div>

                            

                        </div>

                        <div className="traiter-vente">
                            <div className="h2">
                                <h2>Traiter une Vente</h2>
                            </div>
                                
                            
                            <button className="nouvelle-vente">
                                <Plus size={18}/>
                                Nouvelle Vente
                            </button>

                            <div className="tableau-traitement-vente">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ventes Récentes</th>
                                            <th>Montant</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ibuprofène 1</td>
                                            <td>1 267,00 $</td>
                                        </tr>

                                        <tr>
                                            <td>Ibuprofène 1</td>
                                            <td>1 267,00 $</td>
                                        </tr>

                                        <tr>
                                            <td>Ibuprofène 1</td>
                                            <td>1 267,00 $</td>
                                        </tr>

                                        <tr>
                                            <td>Ibuprofène 1</td>
                                            <td>1 267,00 $</td>
                                        </tr>

                                        
                                    </tbody>

                                    
                                </table>

                                        <div className="bat-y">
                                            <h2>Sessions de Caisse Ouvertes</h2>
                                            <p>Caisse A Ouverte 0,00 $</p>
                                            <p>Caisse A Ouverte 0,00 $</p>
                                        </div>

                                        <div className="card-traitement-vente">
                                            <a href="">Terminal POS →</a>
                                        </div>


                            </div>




                            </div>

                            

                            

                    </div>

                    <div className="card-Commandes">
                        <div className="tit">
                            <h3>Pipeline des Commandes d'Achat</h3>
                            <h4>Commandes Actives</h4>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Commande</th>
                                    <th>Statut</th>
                                    <th>Tendance Valeur</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bon de commande 1</td>
                                    <td>Brouillon</td>
                                    <td></td>
                                    <td>1 836,00 $</td>
                                </tr>
                                <tr>
                                    <td>Bon de commande 2</td>
                                    <td>Confirmé</td>
                                    <td></td>
                                    <td>1 836,00 $</td>
                                </tr>
                                <tr>
                                    <td>Bon de commande 3</td>
                                    <td>Reçu</td>
                                    <td></td>
                                    <td>1 836,00 $</td>
                                </tr>
                                <tr>
                                    <td>Bon de commande 4</td>
                                    <td>Annulé</td>
                                    <td></td>
                                    <td>1 836,00 $</td>
                                </tr>
                                
                                
                            </tbody>

                           
                        </table>
                                <div>
                                    <a href="http://">Créer une nouvelle commande →</a>
                                </div>

                    </div>
        
        </div>   
        
        </main>
    );
}

export default Dashboard;