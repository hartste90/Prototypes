using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameGUI : MonoBehaviour 
{
    public Image[] healthImages;
    public Image[] gemImages;

    public Destructible player;

    public GameObject wonGUI;
    public GameObject loseGUI;

	// Use this for initialization
	void Start () 
    {
        wonGUI.SetActive( false );
        loseGUI.SetActive( false );
	}

    public bool DidWinGame()
    {
        if( player == null )
        {
            return false;
        }

        return !DidLoseGame() && player.GetComponent<PickupGetter>().FindPickupCount( "gem" ) >= 3;
    }

    public bool DidLoseGame()
    {
        bool didLoseGame = player == null || player.isDying;
        return didLoseGame;
    }
	
	// Update is called once per frame
	void Update () {
		
        wonGUI.SetActive( DidWinGame() );
        loseGUI.SetActive( DidLoseGame() );
        UpdateHealthImages();
        UpdateGemImages();
	}

    protected void UpdateGemImages()
    {
        int gemCount = 0;
        if( player != null )
        {
            gemCount = player.GetComponent<PickupGetter>().FindPickupCount( "gem" );
        }

        for( int gemImageIndex = 0; gemImageIndex < gemImages.Length; gemImageIndex++ )
        {
            bool isActive = gemCount >= ( gemImageIndex + 1 );
            gemImages[ gemImageIndex ].gameObject.SetActive( isActive );
        }
    }

    protected void UpdateHealthImages()
    {
        int health = 0;
        if( player != null )
        {
            health = player.hitPoints;
        }

        for( int healthImageIndex = 0; healthImageIndex < healthImages.Length; healthImageIndex++ )
        {
            bool isActive = health >= ( healthImageIndex + 1 );
            healthImages[ healthImageIndex ].gameObject.SetActive( isActive );
        }
    }

    public void RestartGame()
    {
        SceneManager.LoadScene( "MainScene" );
    }
}
